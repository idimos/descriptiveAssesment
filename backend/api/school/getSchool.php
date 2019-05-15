<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// include database and object files
include_once '../config/database.php';
include_once '../objects/school.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
$school = new School($db);
 
// set ID property of record to read
$school->code = isset($_GET['code']) ? $_GET['code'] : die();
$school->getSchool();
 
if($school->name!=null){
    // create array
    $school_arr = [
        "id" =>  $school->id,
        "name" => $school->name,
        "type" => $school->type,
        "code" => $school->code,
        "zip" => $school->zip,
        "address" => $school->address,
        "email" => $school->email,
        "tel" => $school->tel
    ];
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
    echo json_encode($school_arr);
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user school does not exist
    echo json_encode(array("message" => "school does not exist."));
}
?>
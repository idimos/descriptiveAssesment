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
include_once '../objects/teacher.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
$teacher = new Teacher($db);
 
// set ID property of record to read
$teacher->afm = isset($_GET['afm']) ? $_GET['afm'] : die();
$teacher->password = isset($_GET['password']) ? $_GET['password'] : die();
$teacher->login();
 
if($teacher->surname!=null){
    // create array
    $teacher_arr = [
        "id" =>  $teacher->id,
        "name" => $teacher->name,
        "surname" => $teacher->surname,
        "middlename" => $teacher->middlename,
        "sex" => $teacher->sex,
        "am" => $teacher->am,
        "afm" => $teacher->afm,
        "address" => $teacher->address,
        "eidikotita" => $teacher->eidikotita,
        "eidikotitaCode" => $teacher->eidikotitaCode,
        "email" => $teacher->email,
        "mobile" => $teacher->mobile,
        "tel" => $teacher->tel
    ];
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
    echo json_encode($teacher_arr);
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user teacher does not exist
    echo json_encode(array("message" => "teacher does not exist."));
}
?>
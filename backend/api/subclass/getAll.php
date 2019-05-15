<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/subclass.php';

// get database connection
$database = new Database();
$db = $database->getConnection();
 
$subclass = new Subclass($db); 
$stmt = $subclass->getAll();
$num = $stmt->rowCount();

if($num>0){
    // subclass array
    $subclass_arr=array();

    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);

        $subclass_item=array(
            "id" => $id,
            "name" => $name,
            "classname" => $classname
        );

        array_push($subclass_arr, $subclass_item);
    }

    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
    echo json_encode($subclass_arr);
} 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user subclass does not exist
    echo json_encode(array("message" => "subclass does not exist."));
}

?>
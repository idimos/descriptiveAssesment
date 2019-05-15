<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/lessons.php';

// get database connection
$database = new Database();
$db = $database->getConnection();
 
$lessons = new Lessons($db);
// set ID property of record to read
$lessons->subclassid = isset($_GET['subclassid']) ? $_GET['subclassid'] : die();
 
$stmt = $lessons->getTeacherLessonsFromSubClassId();
$num = $stmt->rowCount();

if($num>0){
    // lessons array
    $lessons_arr=array();

    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);

        $lessons_item=array(
            "id" => $id,
            "name" => $name
        );
        array_push($lessons_arr, $lessons_item);
    }

    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
    echo json_encode($lessons_arr);
} 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user lessons does not exist
    echo json_encode(array("message" => "lessons does not exist."));
}

?>
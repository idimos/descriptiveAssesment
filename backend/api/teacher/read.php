<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/teacher.php';
 
// instantiate database and teacher object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$teacher = new Teacher($db);

// query teachers
$stmt = $teacher->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // teachers array
    $teachers_arr=array();
    $teachers_arr["records"]=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        extract($row);
 
        $teacher_item=array(
            "id" => $id,
            "name" => $name,
            "surname" => html_entity_decode($surname),
            "middlename" => $middlename,
            "am" => $am,
            "afm" => $afm,
            "sex" => $sex,
            "address" => $address,
            "zip" => $zip,
            "tel" => $tel,
            "mobile" => $mobile,
            "email" => $email,
            "eidikotitaCode" => $eidikotitaCode,
            "eidikotita" => $eidikotita
        );
 
        array_push($teachers_arr["records"], $teacher_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show teachers data in json format
    echo json_encode($teachers_arr);
} else {
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no products found
    echo json_encode(
        array("message" => "No products found.")
    );
}
?>
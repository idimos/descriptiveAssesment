<?php
class Lessons{
 
    // database connection and table name
    private $conn;

    // object properties
    public $id;
    public $name;
    public $subclassid;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function getAll(){

        $query = "SELECT * FROM lessons";
        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
    
        return $stmt;
    }
   
    function getTeacherLessonsFromSubClassId(){

        $query = "SELECT 
                        lessons.id,lessons.name 
                    FROM 
                        lessons, assigned_lessons 
                    WHERE 
                        assigned_lessons.lessonid = lessons.id AND
                        assigned_lessons.subclassid = ?";
    
        $stmt = $this->conn->prepare( $query );
        $stmt->bindParam(1, $this->subclassid);
        $stmt->execute();

        return $stmt;
    }

}
?>
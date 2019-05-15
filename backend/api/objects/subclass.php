<?php
class Subclass{
 
    // database connection and table name
    private $conn;

    // object properties
    public $id;
    public $name;
    public $classname;
    public $teacherAfm;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function getAll(){

        $query = "SELECT * FROM subclasses ORDER BY name";
        $stmt = $this->conn->prepare( $query );
        $stmt->execute();
    
        return $stmt;
    }
   
    function getTeacherSubclasses(){

        $query = "SELECT subclasses.* FROM subclasses, assigned_lessons WHERE subclasses.id = assigned_lessons.subclassid AND assigned_lessons.teacherafm = ?";
    
        $stmt = $this->conn->prepare( $query );
        $stmt->bindParam(1, $this->teacherAfm);
        $stmt->execute();

        return $stmt;
    }

}
?>
<?php
class School{
 
    // database connection and table name
    private $conn;
 
    // object properties
    public $id;
    public $name;
    public $code;
    public $type;
    public $address;
    public $zip;
    public $tel;
    public $email;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function getSchool(){

        $query = "SELECT * FROM schools WHERE code = ? LIMIT 0,1";
    
        $stmt = $this->conn->prepare( $query );
        $stmt->bindParam(1, $this->code);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
        // set values to object properties
        $this->id = $row['id'];
        $this->name = $row['name'];
        $this->address = $row['address'];
        $this->code = $row['code'];
        $this->type = $row['type'];
        $this->email = $row['email'];
        $this->zip = $row['zip'];
        $this->tel = $row['tel'];
    }

}
?>
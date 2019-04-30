<?php
class Teacher{
 
    // database connection and table name
    private $conn;
    private $table_name = "teachers";
 
    // object properties
    public $id;
    public $name;
    public $surname;
    public $middlename;
    public $am;
    public $afm;
    public $sex;
    public $address;
    public $zip;
    public $tel;
    public $mobile;
    public $email;
    public $eidikotitaCode;
    public $eidikotita;
    public $password;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read teachers
    function readAll(){
    
        // select all query
        // $query = "SELECT
        //             c.name as address, p.id, p.name, p.am, p.price, p.afm, p.created
        //         FROM
        //             " . $this->table_name . " p
        //             LEFT JOIN
        //                 categories c
        //                     ON p.afm = c.id
        //         ORDER BY
        //             p.created DESC";
        $query = "SELECT * from " . $this->table_name ." ORDER BY surname ASC";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    function login(){

        $query = "SELECT * FROM " . $this->table_name . " WHERE afm = ? and password = ? LIMIT 0,1";
    
        $stmt = $this->conn->prepare( $query );
        $stmt->bindParam(1, $this->afm);
        $stmt->bindParam(2, $this->password);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
        // set values to object properties
        $this->id = $row['id'];
        $this->name = $row['name'];
        $this->surname = $row['surname'];
        $this->middlename = $row['middlename'];
        $this->sex = $row['sex'];
        $this->am = $row['am'];
        $this->afm = $row['afm'];
        $this->address = $row['address'];
        $this->eidikotita = $row['eidikotita'];
        $this->eidikotitaCode = $row['eidikotitaCode'];
        $this->email = $row['email'];
        $this->mobile = $row['mobile'];
        $this->tel = $row['tel'];
    }

}
?>
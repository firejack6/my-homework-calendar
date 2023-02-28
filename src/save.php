<?php
$data = file_get_contents('php://input');
//print_r($data);
echo file_put_contents("assignmentsPHP.json", $data);
// echo "File saved successfully"
?>

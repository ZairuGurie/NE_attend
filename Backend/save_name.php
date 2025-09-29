<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$first_name = $data['first_name'] ?? '';
$last_name  = $data['last_name'] ?? '';

if (empty($first_name) || empty($last_name)) {
    echo json_encode(["error" => "First and Last name are required"]);
    exit;
}

// Insert into users table (status = pending until full registration is done)
// Set role_id to 1 (student), department_id to 1 (Engineering), course_id to 1 (BSIT) as defaults
// These will be updated later in the registration process
$sql = "INSERT INTO users (first_name, last_name, role_id, department_id, course_id, status) VALUES (?, ?, 1, 1, 1, 'pending')";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $first_name, $last_name);

if ($stmt->execute()) {
    echo json_encode(["message" => "✅ Name saved", "user_id" => $stmt->insert_id]);
} else {
    echo json_encode(["error" => "❌ Database error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>

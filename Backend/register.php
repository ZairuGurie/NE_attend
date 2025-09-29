<?php
include 'db.php';

// Get JSON input (for React fetch)
$data = json_decode(file_get_contents("php://input"), true);

$first_name = $data['first_name'];
$last_name = $data['last_name'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_BCRYPT); // secure hash
$role_id = $data['role_id'];
$department_id = $data['department_id'];
$course_id = $data['course_id'];

$sql = "INSERT INTO users (first_name, last_name, email, password_hash, role_id, department_id, course_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssiii", $first_name, $last_name, $email, $password, $role_id, $department_id, $course_id);

if ($stmt->execute()) {
    echo json_encode(["message" => "✅ User registered successfully", "userId" => $stmt->insert_id]);
} else {
    echo json_encode(["error" => "❌ Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>

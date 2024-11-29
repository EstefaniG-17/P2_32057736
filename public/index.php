<?php
require '../config/database.php';

// Lógica para manejar las solicitudes
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $comentario = $_POST['comentario'];
    $ip_address = $_SERVER['REMOTE_ADDR'];

    // Insertar en la base de datos
    $stmt = $db->prepare("INSERT INTO contactos (nombre, email, comentario, ip_address) VALUES (?, ?, ?, ?)");
    $stmt->execute([$nombre, $email, $comentario, $ip_address]);

    header('Location: ../views/confirmacion.php');
    exit;
}

// Renderizar el formulario
require '../views/index.php';
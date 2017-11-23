<?php
  include_once 'header.php';
  header('Content-type: application/json; charset=utf-8');

  error_reporting(E_ALL);

  function getAllPlaces($dbh, $approved = 1) {
    $query = $dbh->prepare('SELECT * FROM places WHERE approved = :status');
    $query->bindParam(':status', $approved);
    if ($query->execute()) {
      return array(
        'status' => 1,
        'data' => $query->fetchAll(PDO::FETCH_ASSOC)
      );
    }
  }

  function getPlaceById($dbh, $id) {
    $query = $dbh->prepare('SELECT * FROM places WHERE id = :id');
    $query->bindParam(':id', $id, PDO::PARAM_INT);
    if ($query->execute()) {
      if ($query->rowCount()) {
        $data = $query->fetch(PDO::FETCH_ASSOC);
        return array(
          'status' => 1,
          'data' => $data
        );
      } else {
        return array(
          'status' => 0,
          'message' => 'Empresa não encontrada.'
        );
      }
    } else {
      return array(
        'status' => 0,
        'message' => 'Erro ao tentar buscar empresa.'
      );
    }
  }

  if (isset($_GET['id'])) {
    $result = getPlaceById($dbh, $_GET['id']);
  } else {
    $result = getAllPlaces($dbh);
  }

  echo json_encode($result);

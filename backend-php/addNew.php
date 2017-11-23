<?php

  include_once 'header.php';
  error_reporting(E_ALL);
  session_start();
  $content = json_decode(file_get_contents('php://input'), true);
  $loadedData = $content['data'];
  $data = array();

  foreach ($loadedData as $value) {
    $key = array_keys($value)[0];
    $data[$key] = $value[$key];
  }

  class addNew {

    private $step;
    protected $data = null;
    protected $db = null;

    function __construct() {
      $this->setStep();
    }

    // Id
    function getId() {
      return $_SESSION['id'];
    }

    function setId($id) {
      $_SESSION['id'] = $id;
    }

    // Step
    function getStep() {
      return $this->step;
    }

    function setStep($step = null) {
      if ($step) {
        $this->step = $step;
      } else {
        $this->step = ($_SESSION['step']) ? $_SESSION['step'] : 1;
      }
      $_SESSION['step'] = $this->step;
    }

    // Status
    function isDone() {
      return $_SESSION['done'];
    }

    function setDone($bool) {
      $_SESSION['done'] = $bool;
    }

    function setData($data) {
      $this->data = $data;
    }

    function setDB($db) {
      $this->db = $db;
    }

    function firstStep() {
      $type = $this->data['type'] || 1;
      $name = $this->data['name'];
      $email = $this->data['email'];
      $title = $this->data['companyName'];
      $site = $this->data['site'];
      $employeeQtt = $this->data['employeeQtt'];
      $description = $this->data['description'];
      $date = $this->data['date'];
      $cep = $this->data['cep'];
      $street = $this->data['street'];
      $number = $this->data['number'];
      $neighborhood = $this->data['neighborhood'];
      $complement = $this->data['complement'];
      $state = $this->data['state'];
      $ckbxEarning = $this->data['ckbxEarning'];
      $ckbxSelling = $this->data['ckbxSelling'];
      $ckbxInvesting = $this->data['ckbxInvesting'];

      if (!$name || !$email || !$site || !$date || !$street || !$number || !$neighborhood || !$state) {
        return array(
          'status' => 0,
          'message' => 'Todos os campos são obrigatórios.'
        );
      } else {

        // Verify what is it!
        if ($sg_enabled) {
          try {
            @$r = $http->doPost('/organization', $data);
            return json_encode($r, 1);
            if ($response['response'] == 'success') {
              include_once('startupgenome_get.php');
              $response = array(
                'status' => 1,
                'message' => 'success'
              );
            }
          } catch (Exception $e) {
            return array(
              'status' => 0,
              'message' => $e
            );
          }

          // Save data to local database
        } else {
          $insert = $this->db->prepare(
            'INSERT INTO places
              (approved, type, owner_name, owner_email, title, uri, employees, description, start_date)
              VALUES
              (null, :type, :owner_name, :owner_email, :title, :uri, :employees, :description, :start_date)'
          );

          $query = "INSERT INTO places
              (approved, type, owner_name, owner_email, title, uri, employees, description, start_date)
              VALUES
              (null, '$type', '$name', '$email', '$title', '$uri', '$employeeQtt', '$description', '$date')";


          $insert->bindParam(':type', $type);
          $insert->bindParam(':owner_name', $name, PDO::PARAM_STR);
          $insert->bindParam(':owner_email', $email, PDO::PARAM_STR);
          $insert->bindParam(':title', $title, PDO::PARAM_STR);
          $insert->bindParam(':uri', $site, PDO::PARAM_STR);
          $insert->bindParam(':employees', $employeeQtt, PDO::PARAM_STR);
          $insert->bindParam(':description', $description, PDO::PARAM_STR);
          $insert->bindParam(':start_date', $date, PDO::PARAM_STR);

          if ($insert->execute()) {
            $id = $this->db->lastInsertId();
            $this->setId($id);
            $this->setStep(2);
            return array(
              'status' => 1,
              'message' => 'success',
              'query' => $query
            );
          } else {
            return array(
              'status' => 0,
              'message' => 'Falha ao salvar dados'
            );
          }
        }
      }
    }
    // End first step

    function secondStep() {
      // Update data based on current id
      $id = $this->getId();
      if ($id) {
        $dedicationTime = $this->data['dedicationTime'];
        $startupDescription = $this->data['startupDescription'];
        $projectStage = $this->data['projectStage'];
        $whyIsInovating = $this->data['whyIsInovating'];
        $businessType = $this->data['businessType'];
        $businessPlan = $this->data['businessPlan'];
        $hasMVP = $this->data['hasMVP'];
        $hasBusinessPlan = $this->data['hasBusinessPlan'];
        $internationalizable = $this->data['internationalizable'];
        $multilanguage = $this->data['multilanguage'];
        $currentInterest = $this->data['currentInterest'];
        $bigDifficulties = $this->data['bigDifficulties'];

        $id = $this->getId();

        $query = "UPDATE places SET
            dedicationTime = '$dedicationTime',
            startupDescription = '$startupDescription',
            projectStage = '$projectStage',
            whyIsInovating = '$whyIsInovating',
            businessType = '$businessType',
            businessPlan = '$businessPlan',
            hasMVP = '$hasMVP',
            hasBusinessPlan = '$hasBusinessPlan',
            internationalizable = '$internationalizable',
            multilanguage = '$multilanguage',
            currentInterest = '$currentInterest',
            bigDifficulties = '$bigDifficulties'
          WHERE id = '$id'";

        $update = $this->db->prepare(
          'UPDATE places SET
            dedicationTime = :dedicationTime,
            startupDescription = :startupDescription,
            projectStage = :projectStage,
            whyIsInovating = :whyIsInovating,
            businessType = :businessType,
            businessPlan = :businessPlan,
            hasMVP = :hasMVP,
            hasBusinessPlan = :hasBusinessPlan,
            internationalizable = :internationalizable,
            multilanguage = :multilanguage,
            currentInterest = :currentInterest,
            bigDifficulties = :bigDifficulties
          WHERE id = :id'
        );

        $update->bindParam(':dedicationTime', $dedicationTime);
        $update->bindParam(':startupDescription', $startupDescription);
        $update->bindParam(':projectStage', $projectStage);
        $update->bindParam(':whyIsInovating', $whyIsInovating);
        $update->bindParam(':businessType', $businessType);
        $update->bindParam(':businessPlan', $businessPlan);
        $update->bindParam(':hasMVP', $hasMVP);
        $update->bindParam(':hasBusinessPlan', $hasBusinessPlan);
        $update->bindParam(':internationalizable', $internationalizable);
        $update->bindParam(':ultilanguage', $multilanguage);
        $update->bindParam(':currentInterest', $currentInterest);
        $update->bindParam(':bigDifficulties', $bigDifficulties);
        $update->bindParam(':id', $id, PDO::PARAM_INT);

        if ($update->execute()) {
          return array(
            'status' => 0,
            'message' => 'Erro ao inserir novas informações'
          );
        } else {
          $this->setStep(3);
          return array(
            'status' => 1,
            'query' => $query
          );
        }

      } else {
        return array(
          'status' => 0,
          'message' => 'Dados não encontrados',
          'query' => $query
        );
      }
    }
    // End second step

    function thirdStep() {
      $taxation = $this->data['taxation'];
      $monthlyProfit = $this->data['monthlyProfit'];
      $qttEmployees = $this->data['qttEmployees'];

      $query = "UPDATE places SET
          taxation = '$taxation',
          monthlyProfit = '$monthlyProfit',
          qttEmployees = '$qttEmployees'
        WHERE id = '$id'";

      if (!$monthlyProfit) {
        return array(
          'status' => 0,
          'message' => 'Todos os campos devem ser preenchidos',
          'query' => $query
        );
      } else {
        $update = $this->db->prepare(
          'UPDATE places SET
            taxation = :taxation,
            monthlyProfit = :monthlyProfit,
            qttEmployees = :qttEmployees
          WHERE id = :id'
        );

        $id = $this->getId();

        $update->bindParam(':taxation', $taxation);
        $update->bindParam(':monthlyProfit', $monthlyProfit);
        $update->bindParam(':qttEmployees', $qttEmployees);
        $update->bindParam(':id', $id, PDO::PARAM_INT);

        if ($update->execute()) {
          $this->setStep(4);
          return array(
            'status' => 1,
            'query' => $query
          );
        } else {
          return array(
            'status' => 0,
            'message' => 'Dados não encontrados',
            'query' => $query
          );
        }
      }
    }
    // End third step

    function fourthStep() {
      $gatheringInvestments = $this->data['gatheringInvestments'];
      $desiredValue = $this->data['desiredValue'];
      $desiredAction = $this->data['desiredAction'];
      $percentageWantToOffer = $this->data['percentageWantToOffer'];
      $timeToRefund = $this->data['timeToRefund'];

      if ( $gatheringInvestments ) {
        if (!$desiredValue || !$desiredAction || !$percentageWantToOffer || !$timeToRefund) {
          return array(
            'status' => 0,
            'message' => 'Todos os campos são obrigatórios.'
          );
        } else {
          $update = $this->db->prepare(
            'UPDATE places SET
              gatheringInvestments = :gatheringInvestments,
              desiredValue = :desiredValue,
              desiredAction = :desiredAction,
              percentageWantToOffer = :percentageWantToOffer,
              timeToRefund = :timeToRefund
            WHERE id = :id'
          );

          $id = $this->getId();

          $query = "UPDATE places SET
            gatheringInvestments = '$gatheringInvestments',
            desiredValue = '$desiredValue',
            desiredAction = '$desiredAction',
            percentageWantToOffer = '$percentageWantToOffer',
            timeToRefund = '$timeToRefund'
          WHERE id = '$id'";

          $update->bindParam(':gatheringInvestments', $gatheringInvestments);
          $update->bindParam(':desiredValue', $desiredValue);
          $update->bindParam(':desiredAction', $desiredAction);
          $update->bindParam(':percentageWantToOffer', $percentageWantToOffer);
          $update->bindParam(':timeToRefund', $timeToRefund);
          $update->bindParam(':id', $id, PDO::PARAM_INT);

          if ( $update->execute() ) {
            $this->setStep(5);
            return array(
              'status' => 1,
              'query' => $query
            );
          } else {
            return array(
              'status' => 0,
              'message' => 'Erro ao cadastrar os dados',
              'query' => $query
            );
          }
        }
      }
    }
    // End fourth step

    function fifthStep() {
      $members = $this->data['members'];
      $membersGraduation = $this->data['membersGraduation'];
      $membersOccupation = $this->data['membersOccupation'];

      if (!$members || !$membersGraduation || !$membersOccupation ) {
        return array(
          'status' => 0,
          'message' => 'Todos os campos são obrigatórios.',
          'query' => $query
        );
      } else {
        $update = $this->db->prepare(
          'UPDATE places SET
            members = :members,
            membersGraduation = :membersGraduation,
            membersOccupation = :membersOccupation
          WHERE id = :id'
        );

        $id = $this->getId();

        $query = "UPDATE places SET
            members = '$members',
            membersGraduation = '$membersGraduation',
            membersOccupation = '$membersOccupation'
          WHERE id = '$id'";

        $update->bindParam('members', $member);
        $update->bindParam('membersGraduation', $membersGraduation);
        $update->bindParam('membersOccupation', $membersOccupation);
        $update->bindParam('id', $id, PDO::PARAM_INT);

        if ($update->execute()) {
          $this->setDone(true);
          return array(
            'status' => 1,
            'query' => $query
          );
        } else {
          return array(
            'status' => 0,
            'message' => 'Erro ao atualizar os dados',
            'query' => $query
          );
        }
      }
    }
    // End fifth step

  }

  $addCompany = new addNew();
  $addCompany->setDB($dbh);
  $addCompany->setData($data);

  $currentStep = $addCompany->getStep();
  if (!$currentStep) {
    $addCompany->setStep(1);
    $currentStep = $addCompany->getStep();
  }

  switch ($currentStep) {
    case 1: echo json_encode($addCompany->firstStep()); break;
    case 2: echo json_encode($addCompany->secondStep()); break;
    case 3: echo json_encode($addCompany->thirdStep()); break;
    case 4: echo json_encode($addCompany->fourthStep()); break;
    case 5: echo json_encode($addCompany->fifthStep()); break;
    default: echo json_encode($addCompany->firstStep()); break;
  }

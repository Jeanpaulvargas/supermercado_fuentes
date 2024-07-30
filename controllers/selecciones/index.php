<?php

require '../../models/selecciones.php';
header('Content-Type: application/json; charset=UTF-8');

$metodo = $_SERVER['REQUEST_METHOD'];

try {
    switch ($metodo) {
        case 'POST':
            $tipo = $_POST['tipo'] ?? null; 
            $selecciones = new selecciones($_POST);
            
            switch ($tipo) {
                case '1':
                    $ejecucion = $selecciones->guardar();
                    $mensaje = "Guardado correctamente";
                    break;

                default:
                    throw new Exception('Tipo de operación no válido');
            }

            http_response_code(200);
            echo json_encode([
                "mensaje" => $mensaje,
                "codigo" => 1,
            ]);
            break;

        case 'GET':
            $cliente_seleccion_id = isset($_GET['cliente_seleccion_id']) ? $_GET['cliente_seleccion_id'] : '';
            $producto_seleccion_id = isset($_GET['producto_seleccion_id']) ? $_GET['producto_seleccion_id'] : '';

            $selecciones = new selecciones([
                'cliente_seleccion_id' => $cliente_seleccion_id,
                'producto_seleccion_id' => $producto_seleccion_id
            ]);
            
            $seleccioness = $selecciones->buscar(); 
            http_response_code(200);
            echo json_encode($seleccioness);
            break;

        default:
            http_response_code(405);
            echo json_encode([
                "mensaje" => "Método no permitido",
                "codigo" => 9,
            ]);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "detalle" => $e->getMessage(),
        "mensaje" => "Error de ejecución",
        "codigo" => 0,
    ]);
}

exit;

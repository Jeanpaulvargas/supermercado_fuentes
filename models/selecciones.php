<?php

require_once 'conexion.php';

class selecciones extends Conexion
{
    public $selecciones_id;
    public $cliente_seleccion_id;
    public $producto_seleccion_id;

    public function __construct($args = [])
    {
        $this->selecciones_id = $args['selecciones_id'] ?? null;
        $this->cliente_seleccion_id = $args['cliente_seleccion_id'] ?? '';
        $this->producto_seleccion_id = $args['producto_seleccion_id'] ?? '';
    }

    public function guardar()
    {
        $sql = "INSERT INTO selecciones (cliente_seleccion_id, producto_seleccion_id) VALUES ('$this->cliente_seleccion_id', '$this->producto_seleccion_id')";
        $resultado = $this->ejecutar($sql);
        return $resultado;
    }
    
    public function buscar()
    {
        $sql = "SELECT 
            clientes.cliente_nombre, 
            productos.producto_nombre, 
            productos.producto_precio
        FROM 
            selecciones
        INNER JOIN 
            clientes ON selecciones.cliente_seleccion_id = clientes.cliente_id 
        INNER JOIN 
            productos ON selecciones.producto_seleccion_id = productos.producto_id
        WHERE 
            clientes.cliente_situacion = 1
            AND productos.producto_situacion = 1";

        $resultado = self::servir($sql);
        return $resultado;
    }
}

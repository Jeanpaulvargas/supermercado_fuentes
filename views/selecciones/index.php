<?php 
include_once '../../includes/header.php';
include_once '../../models/cliente.php';
include_once '../../models/producto.php';
?>

<?php
$vercliente = new cliente();
$clientes = $vercliente->mostrarCliente();

$verproducto = new producto();
$productos = $verproducto->mostrarProducto();
?>

<div class="container">
    <h1 class="text-center">Formulario de compras</h1>
    <div class="row justify-content-center mb-3">
        <form class="col-lg-8 border bg-light p-3">
            <input type="hidden" name="selecciones_id" id="selecciones_id">

            <div class="row mb-3">
                <div class="col">
                    <label for="cliente_seleccion_id">Cliente</label>
                    <select id="cliente_seleccion_id" name="cliente_seleccion_id" class="form-control">
                    <option value="">SELECCIONE</option>
                    <?php foreach ($clientes as $cliente) : ?>
                        <option value="<?= $cliente['cliente_id'] ?>">
                            <?= $cliente['cliente_nombre'] ?>
                            <?= $cliente['cliente_apellido'] ?>
                        </option>
                    <?php endforeach; ?>
                </select>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <label for="producto_seleccion_id">Producto</label>
                    <select id="producto_seleccion_id" name="producto_seleccion_id" class="form-control">
                    <option value="">SELECCIONE</option>
                    <?php foreach ($productos as $producto) : ?>
                        <option value="<?= $producto['producto_id'] ?>">
                            <?= $producto['producto_nombre'] ?>
                        </option>
                    <?php endforeach; ?>
                </select>
                </div>
            </div>
            <div class="row justify-content-center mb-3">
                <div class="col">
                    <button type="submit" id="btnGuardar" class="btn btn-primary w-100">Guardar</button>
                </div>
                <div class="col">
                    <button type="button" id="btnBuscar" class="btn btn-info w-100">Buscar</button>
                </div>
                <div class="col">
                    <button type="reset" id="btnLimpiar" class="btn btn-secondary w-100">Limpiar</button>
                </div>
            </div>
        </form>
    </div>
    <div class="row justify-content-center">
        <div class="col-lg-8 table-responsive">
            <h2 class="text-center">Listado de compra</h2>
            <table class="table table-bordered table-hover" id="tablaselecciones">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Cliente</th>
                        <th>Producto</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="4">No hay compras disponibles</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js"></script>
<script defer src="/fuentes1_vargas2_IS2_crudjs/src/js/funciones.js"></script>
<script defer src="/fuentes1_vargas2_IS2_crudjs/src/js/selecciones/index.js"></script>


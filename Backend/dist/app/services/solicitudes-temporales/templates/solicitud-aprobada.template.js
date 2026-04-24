"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHtmlSolcitudAprobada = void 0;
const getHtmlSolcitudAprobada = (usuario, correo, expiracion) => {
    const contrasena = correo.split('@')[0];
    const fechaExp = expiracion.toLocaleString();
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: #007bff; color: #fff; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .footer { font-size: 12px; color: #666; text-align: center; padding: 10px; }
    .highlight { font-weight: bold; color: #007bff; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Solicitud Aprobada</h2>
    </div>
    <div class="content">
      <p>Hola <span class="highlight">{{usuario}}</span>,</p>
      <p>Tu solicitud de <strong>cuenta temporal</strong> ha sido aprobada.</p>
      <p>Los datos de tu cuenta son:</p>
      <ul>
        <li><strong>Usuario:</strong> ${usuario}</li>
        <li><strong>Contraseña:</strong> ${contrasena}</li>
        <li><strong>Correo registrado:</strong> ${correo}</li>
        <li><strong>Expira el:</strong> ${fechaExp}</li>
      </ul>
      <p>Por favor, recuerda que esta cuenta es <strong>temporal</strong> y dejará de estar activa después de la fecha indicada.</p>
    </div>
    <div class="footer">
      <p>Este es un mensaje automático, no responder.</p>
    </div>
  </div>
</body>
</html>

    `;
};
exports.getHtmlSolcitudAprobada = getHtmlSolcitudAprobada;
//# sourceMappingURL=solicitud-aprobada.template.js.map
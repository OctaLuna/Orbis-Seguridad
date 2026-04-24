"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHtmlSolicitudRechazada = void 0;
const getHtmlSolicitudRechazada = (correo, motivo) => {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Solicitud Temporal Rechazada</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      color: #333333;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    h2 {
      color: #c0392b;
    }
    .reason {
      margin: 20px 0;
      padding: 15px;
      background: #fbeaea;
      border-left: 5px solid #c0392b;
    }
    .footer {
      margin-top: 30px;
      font-size: 14px;
      color: #777777;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Solicitud Rechazada</h2>
    <p>Estimado/a <strong>${correo}</strong>,</p>
    <p>Lamentamos informarle que su solicitud temporal ha sido <strong>rechazada</strong>.</p>

    <div class="reason">
      <p><strong>Motivo de la solicitud:</strong></p>
      <p>${motivo}</p>
    </div>

    <p>En caso de dudas o aclaraciones, puede ponerse en contacto con el administrador.</p>

    <div class="footer">
      <p>Este es un mensaje automático. Por favor, no responda a este correo.</p>
    </div>
  </div>
</body>
</html>
    `;
};
exports.getHtmlSolicitudRechazada = getHtmlSolicitudRechazada;
//# sourceMappingURL=solicitud-rechazada.template.js.map
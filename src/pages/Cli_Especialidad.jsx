import React, { useEffect, useState } from "react";
import { obtenerEspecialidades } from "../services/especialidadesServices";

function Cli_Especialidad() {
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const res = await obtenerEspecialidades();
        setEspecialidades(res.data);
      } catch (err) {
        console.error("Error al obtener especialidades:", err);
      }
    };

    fetchEspecialidades();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Nuestras Especialidades</h2>
      <div className="row g-4">
        {especialidades.map((esp) => (
          <div
            className="col-md-4 col-sm-6 animate__animated animate__fadeIn"
            key={esp.id_especialidad}
          >
            <div className="card h-100 shadow-sm">
              <img
                src={`data:image/jpeg;base64,${esp.imagen}`}
                className="card-img-top"
                alt={esp.nombre}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{esp.nombre}</h5>
                <p className="card-text">{esp.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cli_Especialidad;

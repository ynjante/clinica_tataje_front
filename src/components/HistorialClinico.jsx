import React, { useState, useMemo } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { FaHeartbeat } from "react-icons/fa";
import ConsultaPdfButton from "../admin/components/ConsultaPdfButton";

const HistorialClinico = ({ historial = [], paciente }) => {
  const [filtros, setFiltros] = useState({
    desde: "",
    hasta: "",
    especialidad: "",
  });

  const especialidades = useMemo(() => {
    if (!Array.isArray(historial) || historial.length === 0) return [];
    return [
      ...new Set(
        historial
          .map(c => c.cita?.medico?.especialidad)
          .filter(e => !!e)
      )
    ];
  }, [historial]);

  const handleFiltroChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleLimpiarFiltros = () => {
    setFiltros({
      desde: "",
      hasta: "",
      especialidad: "",
    });
  };

  const aplicarFiltros = (consulta) => {
    const fechaConsulta = new Date(consulta.cita?.fecha);
    const desde = filtros.desde ? new Date(filtros.desde) : null;
    const hasta = filtros.hasta ? new Date(filtros.hasta) : null;

    if (desde && fechaConsulta < desde) return false;
    if (hasta && fechaConsulta > hasta) return false;

    if (
      filtros.especialidad &&
      consulta.cita?.medico?.especialidad !== filtros.especialidad
    ) {
      return false;
    }
    return true;
  };

  const historialFiltrado = (Array.isArray(historial) ? historial : []).filter(aplicarFiltros);

  return (
    <Card className="shadow-sm border-0">
      <Card.Header className="bg-success text-white text-center">
        <h5 className="mb-0"><FaHeartbeat /> Historial Clínico</h5>
      </Card.Header>
      <Card.Body
        style={{ maxHeight: "600px", overflowY: "auto", background: "#f9f9f9" }}
      >
        {(!historial || historial.length === 0) ? (
          <p className="text-muted text-center m-4">
            El paciente aún no tiene consultas médicas registradas.
          </p>
        ) : (
          <>
            {/* Filtros */}
            <Form className="mb-3">
              <Row className="g-2">
                <Col md>
                  <Form.Label>Desde</Form.Label>
                  <Form.Control type="date" name="desde" value={filtros.desde} onChange={handleFiltroChange} />
                </Col>
                <Col md>
                  <Form.Label>Hasta</Form.Label>
                  <Form.Control type="date" name="hasta" value={filtros.hasta} onChange={handleFiltroChange} />
                </Col>
                <Col md>
                  <Form.Label>Especialidad</Form.Label>
                  <Form.Select name="especialidad" value={filtros.especialidad} onChange={handleFiltroChange}>
                    <option value="">Todas</option>
                    {especialidades.map((esp, idx) => (
                      <option key={idx} value={esp}>{esp}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="text-end">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleLimpiarFiltros}
                  >
                    Limpiar Filtros
                  </Button>
                </Col>
              </Row>
            </Form>

            <Row xs={1} md={1} className="g-3">
              {historialFiltrado.length > 0 ? (
                historialFiltrado.map(consulta => (
                  <Col key={consulta.id_consulta || Math.random()}>
                    <Card className="h-100 shadow-sm border border-success">
                      <Card.Header className="bg-light text-center">
                        <strong className="text-success">
                          Consulta #{consulta.id_consulta || "—"}
                        </strong>
                      </Card.Header>
                      <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                          <small>
                            <strong>Fecha:</strong> {consulta.cita?.fecha || "—"} <br />
                            <strong>Hora:</strong> {consulta.cita?.hora || "—"}
                          </small>
                        </Card.Subtitle>
                        <p><strong>Motivo:</strong> {consulta.cita?.motivo || "—"}</p>
                        <p><strong>Diagnóstico:</strong> {consulta.diagnostico || "—"}</p>
                        <p><strong>Tratamiento:</strong> {consulta.tratamiento || "—"}</p>
                        {consulta.observaciones && (
                          <p><strong>Observaciones:</strong> {consulta.observaciones}</p>
                        )}
                        <hr />
                        <p className="mb-0">
                          <strong>Médico:</strong> {consulta.cita?.medico?.nombres || "—"} {consulta.cita?.medico?.apellido_paterno || ""}<br />
                          <strong>Especialidad:</strong> {consulta.cita?.medico?.especialidad || "—"}
                        </p>

                        <div className="mt-3 text-end">
                          <ConsultaPdfButton consulta={consulta} paciente={paciente} />
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p className="text-muted text-center">
                  No se encontraron consultas médicas con los filtros seleccionados.
                </p>
              )}
            </Row>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default HistorialClinico;
  
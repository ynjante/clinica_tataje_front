import { useState } from 'react';
import { consultarDatosPorDni } from '../services/DNI-Service';
import { crearPaciente } from '../services/pacientes';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/RegistroPaciente.css';
import { useNavigate } from 'react-router-dom';



function RegistrarsePaciente() {
    const [dni, setDni] = useState('');
    const [datos, setDatos] = useState(null);
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const buscarDni = async () => {
        try {
            const response = await consultarDatosPorDni(dni);
            setDatos(response.data);
            setError('');
        } catch (err) {
            console.error(err);
            setError('No se encontraron datos para el DNI ingresado');
            setDatos(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!datos) {
            setError('Primero debes consultar el DNI');
            return;
        }

        const nuevoPaciente = {
            ...datos,
            telefono,
            password,
        };

        try {
            await crearPaciente(nuevoPaciente);
            setMensaje('Paciente registrado con éxito');
            setError('');

            // Redirige luego de 2 segundos
            setTimeout(() => {
                navigate('/login-paciente');
            }, 2000);
        } catch (err) {
            console.error(err);
            setError('Error al registrar al paciente');
        }
    };


    return (
        <div className="registro-paciente-container">
            <div className="registro-paciente-imagen">
                <img src="images/registro-paciente.png" alt="Registro" />
            </div>

            <div className="registro-paciente-formulario">
                <h2>Registro de Paciente</h2>

                <div className="registro-paciente-campo-dni">
                    <label>DNI:</label>
                    <input
                        type="text"
                        maxLength={8}
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                    />
                    <button onClick={buscarDni}>🔍</button>
                </div>

                <form onSubmit={handleSubmit} className="registro-paciente-formulario-campos">
                    <div className="registro-paciente-campo">
                        <label>Nombres:</label>
                        <input type="text" value={datos?.nombres || ''} readOnly />
                    </div>
                    <div className="registro-paciente-campo">
                        <label>Apellido Paterno:</label>
                        <input type="text" value={datos?.apellido_paterno || ''} readOnly />
                    </div>
                    <div className="registro-paciente-campo">
                        <label>Apellido Materno:</label>
                        <input type="text" value={datos?.apellido_materno || ''} readOnly />
                    </div>
                    <div className="registro-paciente-campo">
                        <label>Fecha Nacimiento:</label>
                        <input type="date" value={datos?.fecha_nacimiento || ''} readOnly />
                    </div>

                    <input type="hidden" name="estado_civil" value={datos?.estado_civil || ''} />
                    <input type="hidden" name="genero" value={datos?.genero || ''} />
                    <input type="hidden" name="ubigeo" value={datos?.ubigeo || ''} />
                    <input type="hidden" name="direccion" value={datos?.direccion || ''} />

                    <div className="registro-paciente-campo">
                        <label>Teléfono:</label>
                        <input
                            type="text"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                        />
                    </div>
                    <div className="registro-paciente-campo">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div className="registro-paciente-mensaje error">{error}</div>}
                    {mensaje && <div className="registro-paciente-mensaje exito">{mensaje}</div>}

                    <div className="registro-paciente-botones">
                        <button type="submit">Registrar</button>
                        <Link to="/login-paciente" className="registro-paciente-btn-link">
                            <FaArrowLeft size={16} /> <span>Ya tengo cuenta</span>
                        </Link>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default RegistrarsePaciente;

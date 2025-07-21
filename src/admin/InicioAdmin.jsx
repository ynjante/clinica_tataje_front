import React from 'react';
import { FaClinicMedical, FaCalendarAlt, FaClipboardList } from 'react-icons/fa';

const InicioAdmin = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Bienvenido al Sistema de la Clínica</h1>
        <p style={styles.subtitle}>Accede rápidamente a las principales funciones del sistema</p>
      </div>

      <div style={styles.cardsContainer}>
        <div className="admin-card-glow" style={styles.card}>
          <FaClinicMedical style={styles.icon} />
          <h3 style={styles.cardTitle}>Gestión de Pacientes</h3>
          <p style={styles.cardText}>Administra pacientes, visualiza historiales clínicos y más.</p>
        </div>

        <div className="admin-card-glow" style={styles.card}>
          <FaCalendarAlt style={styles.icon} />
          <h3 style={styles.cardTitle}>Gestión de Citas</h3>
          <p style={styles.cardText}>Organiza citas médicas de manera fácil y rápida.</p>
        </div>

        <div className="admin-card-glow" style={styles.card}>
          <FaClipboardList style={styles.icon} />
          <h3 style={styles.cardTitle}>Reserva de Citas</h3>
          <p style={styles.cardText}>Gestiona las reservas hechas en línea por los pacientes.</p>
        </div>
      </div>

      <style>{`
        .admin-card-glow {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .admin-card-glow:hover {
          transform: translateY(-12px);
          box-shadow: 0px 12px 24px rgba(30, 49, 68, 0.3);
        }

        @media (max-width: 768px) {
          .admin-card-glow {
            width: 100% !important;
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    padding: '3rem 2rem',
    background: 'linear-gradient(to right, #e9f1f7, #f6fbff)',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  title: {
    fontSize: '2.8rem',
    color: '#1e3144',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#444',
  },
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    justifyContent: 'center',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '2rem',
    width: '300px',
    textAlign: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  icon: {
    fontSize: '3.2rem',
    color: '#1e3144',
    marginBottom: '1rem',
  },
  cardTitle: {
    fontSize: '1.4rem',
    color: '#1e3144',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  cardText: {
    fontSize: '1rem',
    color: '#666',
  },
};

export default InicioAdmin;

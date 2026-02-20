import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = "http://localhost:8080/demojk/rest/dispositivos";

function App() {
  const [dispositivos, setDispositivos] = useState([]);
  const [form, setForm] = useState({ id: null, nombre: '', marca: '', precio: '' });

  const fetchDispositivos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setDispositivos(data);
    } catch (err) {
      console.error("Error conectando a la API:", err);
    }
  };

  useEffect(() => { fetchDispositivos(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = form.id ? 'PUT' : 'POST';
    await fetch(API_URL, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ id: null, nombre: '', marca: '', precio: '' });
    fetchDispositivos();
  };

  const deleteDispositivo = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este dispositivo?")) {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchDispositivos();
    }
  };

  const cancelarEdicion = () => {
    setForm({ id: null, nombre: '', marca: '', precio: '' });
  };

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h2 className="display-6 fw-bold text-primary">Gestión de Dispositivos</h2>
          <p className="text-muted">Frontend React + Vite</p>
        </div>
      </div>

      <div className="row justify-content-center">
        {/* Columna del Formulario */}
        <div className="col-lg-4 col-md-5 mb-4">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-header bg-white border-0 pt-4 pb-0 text-center">
              <h4 className="fw-bold">{form.id ? 'Editar' : 'Nuevo'} Dispositivo</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold">Nombre</label>
                  <input type="text" className="form-control" placeholder="Ej. Smart Band 10" 
                         value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold">Marca</label>
                  <input type="text" className="form-control" placeholder="Ej. Xiaomi" 
                         value={form.marca} onChange={e => setForm({ ...form, marca: e.target.value })} required />
                </div>
                <div className="mb-4">
                  <label className="form-label text-muted small fw-bold">Precio</label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input type="number" className="form-control" placeholder="0.00" 
                           value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} step="0.01" />
                  </div>
                </div>
                <button type="submit" className={`btn w-100 ${form.id ? 'btn-warning' : 'btn-success'}`}>
                  {form.id ? 'Actualizar Dispositivo' : 'Guardar Dispositivo'}
                </button>
                {form.id && (
                  <button type="button" className="btn btn-light w-100 mt-2" onClick={cancelarEdicion}>
                    Cancelar Edición
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Columna de la Tabla */}
        <div className="col-lg-8 col-md-7">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="px-4 py-3">ID</th>
                      <th className="py-3">Nombre</th>
                      <th className="py-3">Marca</th>
                      <th className="py-3 text-end">Precio</th>
                      <th className="px-4 py-3 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dispositivos.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center text-muted py-4">
                          No hay dispositivos registrados.
                        </td>
                      </tr>
                    ) : (
                      dispositivos.map(d => (
                        <tr key={d.id}>
                          <td className="px-4 fw-bold text-muted">{d.id}</td>
                          <td className="fw-semibold">{d.nombre}</td>
                          <td>{d.marca}</td>
                          <td className="text-end fw-semibold">${d.precio}</td>
                          <td className="px-4 text-center">
                            <button className="btn btn-sm btn-outline-primary me-2 px-3" onClick={() => setForm(d)}>Editar</button>
                            <button className="btn btn-sm btn-outline-danger px-3" onClick={() => deleteDispositivo(d.id)}>Borrar</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
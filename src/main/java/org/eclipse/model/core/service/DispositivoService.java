package org.eclipse.model.core.service;

import java.util.List;

import org.eclipse.model.core.entities.Dispositivo;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager; 
import jakarta.persistence.PersistenceContext;

@Stateless
public class DispositivoService {

    @PersistenceContext(unitName = "silaracPU")
    private EntityManager em;

    public List<Dispositivo> listarTodos() {
        return em.createQuery("SELECT d FROM Dispositivo d", Dispositivo.class).getResultList();
    }

    public void insertar(Dispositivo dispositivo) {
        em.persist(dispositivo);
    }

    public void actualizar(Dispositivo dispositivo) {
        em.merge(dispositivo);
    }

    public void eliminar(Long id) {
        Dispositivo d = em.find(Dispositivo.class, id);
        if (d != null) {
            em.remove(d);
        }
    }
    
    public Dispositivo buscarPorId(Long id) {
        return em.find(Dispositivo.class, id);
    }
}
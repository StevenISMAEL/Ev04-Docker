package org.eclipse.model.core.controller;

import java.io.Serializable;
import java.util.List;

import org.eclipse.model.core.entities.Dispositivo;
import org.eclipse.model.core.service.DispositivoService;

import jakarta.annotation.PostConstruct;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;

@Named
@ViewScoped // Mantiene el estado mientras estés en la misma página
public class DispositivoBean implements Serializable {

    @Inject
    private DispositivoService service;

    private List<Dispositivo> dispositivos;
    private Dispositivo dispositivo;

    @PostConstruct
    public void init() {
        listar();
        dispositivo = new Dispositivo();
    }

    public void listar() {
        dispositivos = service.listarTodos();
    }

    public void guardar() {
        if (dispositivo.getId() == null) {
            service.insertar(dispositivo);
            FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("Dispositivo Creado"));
        } else {
            service.actualizar(dispositivo);
            FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("Dispositivo Actualizado"));
        }
        dispositivo = new Dispositivo();
        listar();
    }

    public void prepararEditar(Dispositivo d) {
        this.dispositivo = d;
    }

    public void eliminar(Long id) {
        service.eliminar(id);
        listar();
        FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("Dispositivo Eliminado"));
    }

    // Getters y Setters necesarios para JSF
    public List<Dispositivo> getDispositivos() { return dispositivos; }
    public Dispositivo getDispositivo() { return dispositivo; }
    public void setDispositivo(Dispositivo dispositivo) { this.dispositivo = dispositivo; }
}
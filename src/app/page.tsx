"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

interface Objeto {
  id: number;
  titulo: string;
  fecha: string;
  descripcion: string;
}

interface ContenedorListadoObjetosProps {
  children: React.ReactNode;
}

interface ContextListadoObjetosProps {
  objetos: Objeto[];
  setObjetos: React.Dispatch<React.SetStateAction<Objeto[]>>;
  handleEdit: (objeto: Objeto) => void;
  handleDelete: (id: number) => void;
}

const ListaObjetosContext = createContext<ContextListadoObjetosProps | null>(null);

const ContenedorListadoObjetos = ({ children }: ContenedorListadoObjetosProps) => {
  const [objetos, setObjetos] = useState<Objeto[]>([]);
  const [open, setOpen] = useState(false);
  const [currentObjeto, setCurrentObjeto] = useState<Objeto | null>(null);
  const [titulo, setTitulo] = useState("");
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Obtener los datos iniciales desde la API
  useEffect(() => {
    const fetchObjetos = async () => {
      try {
        const response = await fetch("/api/objetos");
        if (!response.ok) {
          throw new Error("Error al obtener los objetos");
        }
        const data: Objeto[] = await response.json();
        setObjetos(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchObjetos();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setCurrentObjeto(null);
    setTitulo("");
    setFecha("");
    setDescripcion("");
  };

  const handleEdit = (objeto: Objeto) => {
    setCurrentObjeto(objeto);
    setTitulo(objeto.titulo);
    setFecha(objeto.fecha);
    setDescripcion(objeto.descripcion);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/objetos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al eliminar el objeto");
      }
      // Actualizar el estado local
      setObjetos(objetos.filter((objeto) => objeto.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (currentObjeto) {
      // Actualizar objeto existente
      try {
        const response = await fetch(`/api/objetos/${currentObjeto.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ titulo, fecha, descripcion }),
        });
        if (!response.ok) {
          throw new Error("Error al actualizar el objeto");
        }
        const updatedObjeto: Objeto = await response.json();
        // Actualizar el estado local
        setObjetos(
          objetos.map((objeto) => (objeto.id === updatedObjeto.id ? updatedObjeto : objeto))
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      // Crear nuevo objeto
      try {
        const response = await fetch("/api/objetos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ titulo, fecha, descripcion }),
        });
        if (!response.ok) {
          throw new Error("Error al crear el objeto");
        }
        const newObjeto: Objeto = await response.json();
        // Actualizar el estado local
        setObjetos([...objetos, newObjeto]);
      } catch (error) {
        console.error(error);
      }
    }
    handleClose();
  };

  return (
    <div className="p-4">
      <div className="flex justify-center">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Agregar Objeto
        </Button>
      </div>
      <div className="max-w-lg mx-auto">
        <ListaObjetosContext.Provider value={{ objetos, setObjetos, handleEdit, handleDelete }}>
          {children}
        </ListaObjetosContext.Provider>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{currentObjeto ? "Editar Objeto" : "Agregar Objeto"}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Título"
              type="text"
              fullWidth
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Fecha"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Descripción"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleSave} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

const ListaObjetos = () => {
  const context = useContext(ListaObjetosContext);
  if (context) {
    const { objetos, handleEdit, handleDelete } = context;
    return (
      <List>
        {objetos.map((objeto: Objeto) => (
          <ListItem
            key={objeto.id}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(objeto)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(objeto.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={objeto.titulo}
              secondary={`${objeto.fecha} - ${objeto.descripcion}`}
            />
          </ListItem>
        ))}
      </List>
    );
  }
  return null;
};

export default function MainPage() {
  return (
    <ContenedorListadoObjetos>
      <ListaObjetos />
    </ContenedorListadoObjetos>
  );
}

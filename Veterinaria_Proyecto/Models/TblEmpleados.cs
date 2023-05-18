using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Veterinaria_Proyecto.Models
{
    public class TblEmpleados
    {
        public TblEmpleados()
        {
            TblHistoriaClinica = new HashSet<TblHistoriaClinica>();
        }
        [Key]
        public int IdEmpleado { get; set; }
        public string Usuario { get; set; }
        public string Contraseña { get; set; }
        public string Rol { get; set; }
        public int FkIdEstado { get; set; }

        public virtual TblEstados FkIdEstadoNavigation { get; set; }
        public virtual ICollection<TblHistoriaClinica> TblHistoriaClinica { get; set; }
    }
}

using System.Collections.Generic;

namespace Veterinaria_Proyecto.Models
{
    public partial class TblTipoMascota
    {
        public TblTipoMascota()
        {
            TblMascotas = new HashSet<TblMascotas>();
        }

        public int IdTipoMascota { get; set; }
        public string Nombre { get; set; }

        public virtual ICollection<TblMascotas> TblMascotas { get; set; }
    }
}

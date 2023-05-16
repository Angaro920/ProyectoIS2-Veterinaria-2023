using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Veterinaria_Proyecto.Models
{
    public partial class TblRaza
    {
        public TblRaza()
        {
            TblMascotas = new HashSet<TblMascotas>();
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdRaza { get; set; }
        public string Nombre { get; set; }

        public virtual ICollection<TblMascotas> TblMascotas { get; set; }
    }
}

using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class PostRecipeModel
    {
        public Array recipe { get; set; }
        public IFormFile file { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeBook.Helpers
{
    public class GenerateFileName
    {
        public static string Generate(string context)
        {
            return Path.GetFileNameWithoutExtension(context) + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff") + "_" + Guid.NewGuid().ToString("N");
        }
    }
}

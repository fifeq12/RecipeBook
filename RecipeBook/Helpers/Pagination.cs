using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeBook.Helpers
{
    public class Pagination<T> where T : class
    {
        public Pagination(int pageIndex, int pageSize, int count, IReadOnlyList<T> data)
        {
            PageIndex = pageIndex;
            PageSize = pageSize;
            Count = count;
            Data = data;
        }

        public static Pagination<T> Create(IReadOnlyList<T> data, int pageIndex, int pageSize)
        {     
            var items = data.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            var count = data.Count();
            return new Pagination<T>(pageIndex, pageSize, count, items);
        }

        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int Count { get; set; }
        public IReadOnlyList<T> Data { get; set; }
    }
}

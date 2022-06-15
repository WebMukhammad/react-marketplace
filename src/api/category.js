import { serializeQueryParams, getCancelToken } from "./helper";
import CategoryExtended from "~/model/category/CategoryExtended";
import CategoryExtendedSerializer from "src/serializer/category/CategoryExtended";
import CategorySearch from "~/model/category/CategorySearch";
import CategorySearchSerializer from "src/serializer/category/CategorySearch";
import api from ".";

export async function get({ include } = {}) {
  const result = await api.get(
    `/categories${serializeQueryParams({
      with: include,
    })}`
  );

  return (
    result?.map((el) => CategoryExtended(CategoryExtendedSerializer(el))) || []
  );
}
export function getByID({ id, include = "children" } = {}) {
  return api.get(
    `/categories/${id}${serializeQueryParams({
      with: include,
    })}`
  );
}
export async function search({ query, name, cancel } = {}) {
  try {
    const cancelToken = cancel
      ? getCancelToken({
          name: "search_categories",
          api.ancelToken,
        })
      : null;
    const result = await api.get(
      `/categories/search${serializeQueryParams({
        q: query,
        name,
      })}`,
      {
        cancelToken,
      }
    );
    return (
      result?.map((el) => CategorySearch(CategorySearchSerializer(el))) || []
    );
  } catch (e) {
    /**
     * Если мы отменяем запрос, то резолвим проммис в пустой объект
     */
    if api.sCancel(e)) {
      return new Promise((resolve) => {});
    }
  }
}
export async function getOrFromStore({ include } = {}) {
  const list = this.store.state.category?.list;
  const result = list?.length
    ? list
    : await this.$api.category.get({ include });

  this.store.commit("category/setData", result);
  return result;
}

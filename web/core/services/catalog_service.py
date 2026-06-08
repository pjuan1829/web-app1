from ..domain.catalog_item import CatalogItem
from ..infra.api_client import CatalogApiClient


class CatalogService:
    def __init__(self, api_client: CatalogApiClient) -> None:
        self.api_client = api_client

    def get_catalog(self) -> list[CatalogItem]:
        raw_catalog = self.api_client.fetch_catalog()
        return [CatalogItem.from_dict(item) for item in raw_catalog]

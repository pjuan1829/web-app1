import requests
from requests import Response


class CatalogApiClient:
    def __init__(self, base_url: str) -> None:
        self.base_url = base_url.rstrip('/')

    def fetch_catalog(self) -> list[dict]:
        response: Response = requests.get(f'{self.base_url}/api/catalogo', timeout=5)
        response.raise_for_status()
        return response.json()

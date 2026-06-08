from django.conf import settings
from django.shortcuts import render
from requests.exceptions import RequestException

from .infra.api_client import CatalogApiClient
from .services.catalog_service import CatalogService


def home(request):
    api_client = CatalogApiClient(settings.API_BASE_URL)
    service = CatalogService(api_client)
    data = []
    error_message = None

    try:
        data = service.get_catalog()
    except RequestException as exc:
        error_message = 'No se pudo conectar con la API de catálogo.'
        print('Catalog API connection error:', exc)
    except ValueError as exc:
        error_message = 'La respuesta de la API no es válida.'
        print('Catalog API parse error:', exc)

    return render(request, 'index.html', {'data': data, 'error_message': error_message})
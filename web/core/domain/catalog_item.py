from dataclasses import dataclass


@dataclass
class CatalogItem:
    id: int
    name: str
    description: str
    price: float

    @classmethod
    def from_dict(cls, raw: dict) -> 'CatalogItem':
        return cls(
            id=int(raw.get('id', 0)),
            name=str(raw.get('name', '')),
            description=str(raw.get('description', '')),
            price=float(raw.get('price', 0.0)),
        )

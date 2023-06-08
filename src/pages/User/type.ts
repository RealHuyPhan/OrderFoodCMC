export interface IStrapiBaseAttribute {
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
}

export interface IFoodAttribute extends IStrapiBaseAttribute {
    "foodName": string,
    "price": number,
    "description": string,
    foodImage: {
        data: {
            id: number;
            attributes: IImageAttribute
        }[]
    }
}

export interface IFood {
    "id": number,
    "attributes": IFoodAttribute;
}

export interface IImageFormatSize {
    "name": string;
    "hash": string;
    "ext": string
    "mime": string
    "path": null;
    "width": number;
    "height": number;
    "size": number;
    "url": string;
}

export interface IImageAttribute extends Omit<IStrapiBaseAttribute, 'publishedAt'> {
    "name": string,
    "alternativeText": null,
    "caption": null,
    "width": number,
    "height": number,
    "formats": {
        "thumbnail": IImageFormatSize,
        "small": IImageFormatSize,
        "medium": IImageFormatSize
    },
    "hash": string;
    "ext": string;
    "mime": string;
    "size": number;
    "url": string;
    "previewUrl": null,
    "provider": "local",
    "provider_metadata": null,
}

export interface IImage {
    "id": number,
    "attributes": IImageAttribute;
}

interface IStoreAttribute extends IStrapiBaseAttribute {
    "storeName": string;
    "rate": number | null,
    "user_favorites": {
        "data": []
    },
    "foods": {
        "data": IFood[]
    },
    "image": {
        "data": IImage;
    }
}

export interface IStore {
    "id": number,
    "attributes": IStoreAttribute
}

export interface IUser extends IStrapiBaseAttribute{
    "username": string,
    "email": string,
    "provider": "local",
    "confirmed": false,
    "blocked": false,
    "fullName": string,
    "phone": number,
    "dob": Date
}
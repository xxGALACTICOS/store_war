/*
 * 
 *  REQUESTS
 * */

export type createProductRequest = {
    name: string;
    description: string;
    price: number;
    stock: number;
    companyId: string;
    category: string;
    subCategory: string;
};

export type updateProductRequest = {
    name: string;
    description: string;
    price: number;
};

export type getProductsRequest = {
    category: string;
    subCategory: string;
    // skip?: number;
    // limit?: number;
};

export type getProductRequestParams = {
    id: string;
};
export type deleteProductRequestParams = {
    id: string;
};



/*
 *
 *  RESPONSES
 * */

type product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
}


export type createProductResponse = {
    ok: boolean;
    message: string;
    product?: product;
};

export type updateProductResponse = {
    ok: boolean;
    message: string;
    product?: product;
};

export type deleteProductResponse = {
    ok: boolean;
    message: string;
};

export type getProductResponse = {
    ok: boolean;
    message: string;
    product?: product;
};

export type getProductsResponse = {
    ok: boolean;
    message: string;
    products?: product[];
};

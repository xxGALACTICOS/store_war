interface Props {
    product: string | null
    vendor: string | null
    goBack: () => void
}

const ProductPage = ({ product, vendor, goBack }: Props) => {

    return (
        <div>

            <button
                onClick={goBack}
                className="mb-5 px-4 py-2 bg-gray-200 rounded"
            >
                Back
            </button>

            <h1 className="text-3xl font-bold">{product}</h1>

            <p className="mt-3 text-lg">Vendor: {vendor}</p>

        </div>
    )
}

export default ProductPage
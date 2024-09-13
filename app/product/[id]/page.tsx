
import { productData } from '../../../data/products';
import ProductDetail from '../../../components/ProductDetail';
// import Breadcrumb from '../../../components/BreadCrumb';

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const product = productData.find((p) => p.id === Number(params.id));

  if (!product) {
    return <div>Product not found</div>;
  }

  // const breadcrumbItems = [
  //   { label: 'Home', href: '/' },
  //   { label: 'Products', href: '/products' },
  //   { label: product.name, href: '#' }, // Current page, no link
  // ];

  return (
    <div>
      {/* <Breadcrumb items={breadcrumbItems} /> */}
      <ProductDetail product={product} />
    </div>
  );
};

export default ProductDetailPage;

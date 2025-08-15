"use client";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import styled from "styled-components";
import ProductCard from "@/components/ProductCard";
import { MdShoppingCart, MdListAlt } from "react-icons/md";

export default function ProtectedPage() {
  const cart = useCartStore((s) => s.cart);
  const orders = useOrderStore((s) => s.orders);

  return (
    <Wrapper>
      <Title>마이페이지</Title>

      <Section aria-labelledby="cart-heading">
        <SectionLabel id="cart-heading">
          <MdShoppingCart size={22} style={{ marginRight: 6 }} />
          장바구니
        </SectionLabel>
        {cart.length === 0 ? (
          <EmptyBox>
            <MdShoppingCart size={32} />
            <p>장바구니에 담긴 상품이 없습니다.</p>
          </EmptyBox>
        ) : (
          <Grid>
            {cart.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        )}
      </Section>

      <Divider />

      <Section aria-labelledby="order-heading">
        <SectionLabel id="order-heading">
          <MdListAlt size={22} style={{ marginRight: 6 }} />
          주문 내역
        </SectionLabel>

        {orders.length === 0 ? (
          <EmptyBox>
            <MdListAlt size={32} />
            <p>주문 내역이 없습니다.</p>
          </EmptyBox>
        ) : (
          <OrderTable>
            <caption className="sr-only">주문 내역 표</caption>
            <thead>
              <tr>
                <th scope="col">주문번호</th>
                <th scope="col">상품</th>
                <th scope="col">날짜</th>
              </tr>
            </thead>
            <tbody>
              {[...orders]
                .sort((a, b) => b.date.localeCompare(a.date))
                .map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      {order.items.map((item) => (
                        <span key={item.id} style={{ marginRight: 8 }}>
                          {item.title}
                        </span>
                      ))}
                    </td>
                    <td>{order.date}</td>
                  </tr>
                ))}
            </tbody>
          </OrderTable>
        )}
      </Section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.size.max};
  min-width: ${({ theme }) => theme.size.min};
  margin: 0 auto;
  padding: 2rem 0;
  padding-left: ${({ theme }) => theme.size.gutterMobile};
  padding-right: ${({ theme }) => theme.size.gutterMobile};
  @media (min-width: 768px) {
    padding-left: ${({ theme }) => theme.size.gutterDesktop};
    padding-right: ${({ theme }) => theme.size.gutterDesktop};
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;
const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 800;
  text-align: center;
`;
const Section = styled.section`
  margin-bottom: 2.5rem;
`;
const SectionLabel = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;
const Divider = styled.hr`
  margin: 2.5rem 0;
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${({ theme }) => theme.size.cardMin}, 1fr)
  );
  gap: 1.5rem;
`;
const OrderTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  th,
  td {
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 0.7rem;
    font-size: 1rem;
    text-align: left;
    word-break: break-all;
  }
  th {
    background: ${({ theme }) => theme.colors.gray100};
    font-weight: 700;
  }
`;
const EmptyBox = styled.div`
  padding: 2.5rem 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.subtext};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  font-size: 1.05rem;
`;

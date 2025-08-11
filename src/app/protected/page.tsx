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

      <Section>
        <SectionLabel>
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

      <Section>
        <SectionLabel>
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
            <thead>
              <tr>
                <th>주문번호</th>
                <th>상품</th>
                <th>날짜</th>
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
  padding: 2rem;
  max-width: 960px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionLabel = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Divider = styled.hr`
  margin: 2.5rem 0 2.5rem 0;
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
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
    color: ${({ theme }) => theme.colors.text};
  }

  th {
    background: ${({ theme }) => theme.colors.gray100};
    font-weight: 600;
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

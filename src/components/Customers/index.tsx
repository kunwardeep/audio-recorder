import MainNav from "../MainNav";
import React from "react";
import styled from "styled-components";
import { Table } from "@zendeskgarden/react-tables";
import useFetchCustomers from "../../hooks/useFetchCustomers";
import LoadingComponent from "../LoadingComponent";
import ErrorComponent from "../ErrorComponent";
import { Anchor } from "@zendeskgarden/react-buttons";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled.div`
  overflow-x: auto;
  color-scheme: only ${(p) => p.theme.colors.base};
`;

const StyledTable = styled(Table)`
  min-width: 500px;
`;

const StyledTableCell = styled(Table.Cell)`
  align-content: center;
`;

const StyledAnchor = styled(Anchor)`
  text-decoration: unset;
`;

const Customers = React.memo(() => {
  const navigate = useNavigate();

  const { loading, error, data } = useFetchCustomers();

  return (
    <MainNav>
      {loading && <LoadingComponent />}
      {error && <ErrorComponent error={error} />}
      {data && (
        <StyledContainer>
          <StyledTable>
            <Table.Head>
              <Table.HeaderRow>
                <Table.HeaderCell style={{ width: "100px" }}>
                  User Id
                </Table.HeaderCell>
                <Table.HeaderCell>Name </Table.HeaderCell>
                <Table.HeaderCell>Recordings</Table.HeaderCell>
              </Table.HeaderRow>
            </Table.Head>
            <Table.Body>
              {/*eslint-disable-next-line @arthurgeron/react-usememo/require-usememo*/}
              {data.map((customer, i) => {
                const navigateTo = `/?user=${customer.id}`;
                return (
                  <Table.Row key={customer.name + i}>
                    <StyledTableCell>{customer.id}</StyledTableCell>
                    <StyledTableCell>
                      <StyledAnchor
                        href={"#"}
                        onClick={() => {
                          console.log("yes");
                          navigate(navigateTo);
                        }}
                      >
                        {customer.name}
                      </StyledAnchor>
                    </StyledTableCell>
                    <StyledTableCell>
                      {customer.recordings.length}
                    </StyledTableCell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </StyledTable>
        </StyledContainer>
      )}
    </MainNav>
  );
});

export default Customers;

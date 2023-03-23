import styled from "styled-components";

export const ContainerModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100vh;
  min-height: 80%;
  background-color: rgba(0, 0, 0, 0.5);

  .modal {
    display: flex;
    flex-direction: column;
    width: 25%;
    background-color: white;
    border-radius: 2px;
    padding: 20px;
    max-width: 100%;

    @media (max-width: 768px) {
      width: 50%;
    }

    .closeModalRegister {
      border: transparent;
      background-color: transparent;
      color: black;
      font-size: 1rem;
      font-weight: bold;

      :hover {
        color: gray;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 1rem;
      margin-top: 1rem;
      padding: 5px;

      h3 {
        font-size: 1.5rem;
        color: black;
        font-weight: bolder;
        margin: 0 auto;
      }

      input {
        border: 2px solid #f1e8e8;
        border-radius: 4px;
        width: 80%;
      }

      button {
        background-color: black;
        color: white;
        border-radius: 2px;
        border: 2px solid transparent;
        width: 85%;
        margin: 0 auto;

        :hover {
          background-color: gray;
          color: black;
        }
      }
    }
  }
`;

import styled from "styled-components";
import { css } from "styled-components";
const ContextMenu = styled.div`
  width: 200px;
  padding: 1rem;
  background: #fff;
  color: #000;
  position: absolute;
  ${({ top, left }) => css`
    top: ${top}px;
    left: ${left}px;
  `}
`;
export default ContextMenu;

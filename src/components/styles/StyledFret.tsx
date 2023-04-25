import styled from "styled-components";

// for "fret height" of h-16, which is equal to 4rem
// scale length = (66/4.5) * (4rem * 6) = 352 rem
// distance from nut to fret
// scale length / (2 ^ (N / 12))

// NOTE:            scale length =    (66/4.5) * (4rem * 6) = 352 rem 
//this ratio is taken from my guitar   ^
const SCALE_LENGTH = 352;

export const FretButton = styled.button<{ styledWidth: number }>`
    width: ${({ styledWidth }) =>
        styledWidth !== 0 ? calculateFretWidth(SCALE_LENGTH, styledWidth) : 2}rem;
`;

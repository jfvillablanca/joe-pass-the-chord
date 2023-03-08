import styled from 'styled-components';

function calculateFretWidth(scaleLength: number, fretNumber: number): number {
    return (
        scaleLength / 2 ** ((fretNumber - 1) / 12) -
        scaleLength / 2 ** (fretNumber / 12)
    );
}

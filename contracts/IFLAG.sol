// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import { IOFT } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oft/OFTAdapter.sol";

interface IFLAG is IOFT {
    function mint(address to, uint256 amount) external;

    function burn(uint256 amount) external;

    function burnFrom(address account, uint256 amount) external;
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { OFTAdapter } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oft/OFTAdapter.sol";

contract WrappedForLootAndGlory is OFTAdapter {
    constructor(
        address _token, // a deployed, already existing ERC20 token address
        address _layerZeroEndpoint, // local endpoint address
        address _owner // token owner used as a delegate in LayerZero Endpoint
    ) OFTAdapter(_token, _layerZeroEndpoint, _owner) Ownable(_owner) {}

    function bridgeTokens(uint256 amountLD, uint256 minAmountLD, uint32 dstEid) external returns (uint256, uint256) {
        return _debit(amountLD, minAmountLD, dstEid);
    }
}

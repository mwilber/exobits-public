// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/utils/Counters.sol";

contract Exobits is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string[] public keys;
    mapping(string => uint256) public _keyId;
    
    constructor() ERC721("ExoBits", "XOB") {}
    
    function autoMint(string memory _key, string memory _uri) public payable returns (uint256) {
        
        require(_keyId[_key] == 0, "This key is already minted");
        // Minting cost hard coded to 0.001 eth (2-3 USD)
        require(msg.value >= 3000000000000000, "Insufficient funds. Minting cost is 0.003ETH + Gas");
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);
        keys.push(_key);
        _keyId[_key] = newItemId;
        _setTokenURI(newItemId, _uri);

        //Transfer funds to the contract owner
        address owner = owner();
        payable(owner).transfer(msg.value);
        
        return newItemId;
    }
    
    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }
    
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
    
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    
    function ownerOfKey(string memory _key) external view returns(address){
        address owner;
        if(_keyId[_key] != 0){
             owner = ownerOf(_keyId[_key]);
        }
        return owner;
    }
    
    function tokenByKey(string memory _key) external view returns(uint256) {
        return _keyId[_key];
    }
    
    function tokensOfOwner(address _owner) external view returns(uint256[] memory ownerTokens) {
        uint256 tokenCount = balanceOf(_owner);

        if (tokenCount == 0) {
            // Return an empty array
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 totalKeys = totalSupply();
            uint256 resultIndex = 0;

            // We count on the fact that all tokens have IDs starting at 1 and increasing
            // sequentially up to the totalSupply count.
            uint256 tokenId;

            for (tokenId = 1; tokenId <= totalKeys; tokenId++) {
                if (ownerOf(tokenId) == _owner) {
                    result[resultIndex] = tokenId;
                    resultIndex++;
                }
            }

            return result;
        }
    }
    
    function JsSource() public pure returns (string memory) {
        return "class ArtGenerator{constructor(t){this.ctx=t.ctx,this.slowmo=!1,this.slowmoDelay=t.slowmoDelay,this.renderCallback=t.renderCallback,this.instructions=[]}EnableSlowMode(t){this.slowmo=!t}async UpdateCanvas(){if(!this.updatingCanvas){this.updatingCanvas=!0;for(let t of this.instructions){if(!this.updatingCanvas)return;this.slowmo&&await this.Delay(this.slowmoDelay),'function'==typeof t&&t()}this.updatingCanvas=!1,'function'==typeof this.renderCallback&&this.renderCallback()}}ResetUpdateCanvas(){this.updatingCanvas=!1,this.instructions=[]}ScaleContext(t){this.instructions.push(this._scaleContext.bind({ctx:this.ctx},t))}DrawAtmosphere(t){this.instructions.push(this._drawAtmosphere.bind({ctx:this.ctx},t))}DrawPoint(t,i,s){this.instructions.push(this._drawPoint.bind({ctx:this.ctx},t,i,s))}DrawCol(t,i,s,e){this.instructions.push(this._drawCol.bind({ctx:this.ctx},t,i,s,e))}_scaleContext(t){this.ctx.scale(t,t)}_drawAtmosphere(t){const{height:i,width:s}=this.ctx.canvas||{};this.ctx.fillStyle=t,this.ctx.fillRect(0,0,i,s)}_drawPoint(t,i,s){let{fillStyle:e}=this.ctx;this.ctx.fillStyle=s,this.ctx.fillRect(Math.round(t),Math.round(i),1,1),this.ctx.fillStyle=e}_drawCol(t,i,s,e){let{fillStyle:r}=this.ctx;this.ctx.fillStyle=e,this.ctx.fillRect(Math.round(t),Math.round(i),1,Math.round(s)),this.ctx.fillStyle=r}SortBodyData(t,i){let s=t;return s=t.sort((t,i)=>i-t),1===i?s:(s=t.sort((t,i)=>t-i),2===i?s:(s=t=[...t.filter((t,i)=>i%2),...t.filter((t,i)=>!(i%2)).sort((t,i)=>i-t)],3===i?s:s=t=[...t.filter((t,i)=>i%2),...t.filter((t,i)=>!(i%2))]))}DrawStar(t,i,s){for(let e=s;e>=0;e--){let r=255-255*(e/(s+1)),a=this.GetGreyColor(r);for(let r=-s*e;r<=s*e;r++)for(let s=-e;s<=e;s++)this.DrawPoint(t+r,i+s,a),this.DrawPoint(t+s,i+r,a)}}DrawMoon(t,i,s,e){for(let r=t-s;r<=t+s;r++){const a=Math.floor(2*Math.sqrt(Math.pow(s,2)-Math.pow(r-t,2)));this.DrawCol(r,i-Math.floor(a/2),a,e)}}BodyBrush(t,i,s,e){for(let r=0;r<t.length;r++){let a=t[r]/4,o='rgba(255,255,255,0.8)',l='rgba(0,0,0,0.8)';for(let h=0;h<a;h++){let n=s+(h-a/2),c=e-t.length/2+r,f=!1,w=!1;r>0&&(f=(a-t[r-1]/4)/2),r<t.length-1&&(w=Math.ceil((a-t[r+1]/4)/2)),(!1===f||h<f||h>a-f)&&(this.DrawPoint(n,c-1,i),this.DrawPoint(n,c-1,o)),this.DrawPoint(n,c,i),(!1===w||h<w||h>a-w)&&(this.DrawPoint(n,c+1,i),this.DrawPoint(n,c+1,l))}}}DrawAsset(t){let{asset:i,x:s,y:e,fillColor:r,mirrorH:a}=t;if(!i)return;const o=(t,i,s)=>{switch(s){case 1:this.DrawPoint(t,i,l);break;case 2:this.DrawPoint(t,i,h);break;case 3:this.DrawPoint(t,i,r);break;default:return}},l=this.GetGreyColor(0),h=this.GetGreyColor(255);r=r||this.GetGreyColor(128);for(let t=0;t<i.length;t++)if(a)for(let r=0;r<i[t].length;r++)o(s-r,e+t,i[t][r]);else for(let r=0;r<i[t].length;r++)o(s+r,e+t,i[t][r])}GetGreyColor(t){return'rgb('+t+','+t+','+t+')'}Delay(t){return new Promise(i=>{setTimeout(()=>{i('')},t)})}ResetContext(){this.updatingCanvas||(this.ctx.setTransform(1,0,0,1,0,0),this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height))}}";
    }
    
    function AboutExoBits() public pure returns (string memory) {
        return "ExoBits and the ExoBits Web Component are (c) 2021 Matthew Wilber (greenzeta.com). Images produced by the ExoBits Web Component are wholly owned by the NFT holder of the key value used to produce that image. Complete source of the ExoBits WebComponent is available on GitHub at https://github.com/mwilber/gz-exobit     Visit the exobits website: https://exobits.greenzeta.com";
    }
}

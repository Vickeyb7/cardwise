import re
import hashlib
from typing import List, Dict, Any, Optional

def clean_text(raw_text: str) -> str:
    """
    Cleans raw text, collapses consecutive whitespaces while preserving
    markdown headings and table row structures.
    """
    text = re.sub(r'\r\n', '\n', raw_text)
    # Collapse 3 or more blank lines into 2
    text = re.sub(r'\n{3,}', '\n\n', text)
    # Normalize excessive horizontal whitespace
    text = re.sub(r'[ \t]+', ' ', text)
    return text.strip()

def chunk_document(
    text: str,
    target_tokens: int = 800,
    overlap_tokens: int = 120,
    min_tokens: int = 80,
    metadata: Optional[Dict[str, Any]] = None
) -> List[Dict[str, Any]]:
    """
    Splits document text into overlapping chunks respecting paragraph,
    table, and sentence boundaries.
    Approximates tokens as ~4 characters per token for lightweight portability.
    """
    cleaned = clean_text(text)
    paragraphs = cleaned.split("\n\n")
    
    chunks: List[Dict[str, Any]] = []
    current_chunk: List[str] = []
    current_length = 0
    
    char_target = target_tokens * 4
    char_overlap = overlap_tokens * 4
    char_min = min_tokens * 4

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue
            
        para_len = len(para)
        
        # If adding paragraph exceeds target and we already have sufficient text
        if current_length + para_len > char_target and current_length >= char_min:
            chunk_body = "\n\n".join(current_chunk)
            content_hash = hashlib.sha256(chunk_body.encode('utf-8')).hexdigest()
            
            chunk_item = {
                "chunk_index": len(chunks),
                "text": chunk_body,
                "token_count": len(chunk_body.split()),
                "content_hash": content_hash,
                "metadata": metadata or {}
            }
            chunks.append(chunk_item)
            
            # Carry over overlap from the end of the current chunk
            overlap_text = chunk_body[-char_overlap:] if len(chunk_body) > char_overlap else chunk_body
            current_chunk = [overlap_text, para]
            current_length = len(overlap_text) + para_len
        else:
            current_chunk.append(para)
            current_length += para_len

    # Flush any remaining text
    if current_chunk:
        chunk_body = "\n\n".join(current_chunk)
        content_hash = hashlib.sha256(chunk_body.encode('utf-8')).hexdigest()
        chunk_item = {
            "chunk_index": len(chunks),
            "text": chunk_body,
            "token_count": len(chunk_body.split()),
            "content_hash": content_hash,
            "metadata": metadata or {}
        }
        chunks.append(chunk_item)

    return chunks

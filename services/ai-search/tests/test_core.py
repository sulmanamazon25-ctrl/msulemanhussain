from app.models import sanitize_user_text
from app.rag.chunking import chunk_text
from app.rag.generate import extractive_answer, follow_ups
from app.models import Source


def test_sanitize_strips_controls_and_truncates():
    raw = "hello\x00world" + ("x" * 3000)
    out = sanitize_user_text(raw, max_len=100)
    assert "\x00" not in out
    assert len(out) == 100


def test_chunk_text_overlap():
    text = "word " * 200
    chunks = chunk_text(text, chunk_size=50, overlap=10)
    assert len(chunks) > 1
    assert chunks[0].index == 0


def test_extractive_unavailable_en():
    msg = extractive_answer("xyz", [], "en")
    assert "don't have" in msg.lower() or "contact" in msg.lower()


def test_follow_ups_es():
    f = follow_ups("es", [Source(title="Wasup", url="https://x", snippet="s", score=0.9)])
    assert len(f) == 3
    assert any("Wasup" in x for x in f)
